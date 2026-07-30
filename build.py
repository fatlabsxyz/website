#!/usr/bin/env python3
"""Render content.md + site.json into index.html using template.html.

Usage: ./build.py
  content.md    -> the page text (see the comment at its top for conventions)
  site.json     -> identity/config (title, tagline, meta, socials, ...)
  template.html -> layout shell with {{PLACEHOLDER}} slots
No dependencies — python3 stdlib only.
"""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent
LINK_RE = re.compile(r'\[([^\]]+)\]\(([^)\s]+)\)')
EMAIL_RE = re.compile(r'^[\w.+-]+@[\w-]+(\.[\w-]+)+$')
PROJECT_TITLE_RE = re.compile(r'^###\s+(.*?)(?:\s+\[([^\]]+)\])?\s*$')


def inline(text):
    """Escape HTML and render [label](url) links."""
    parts, pos = [], 0
    for m in LINK_RE.finditer(text):
        parts.append(html.escape(text[pos:m.start()]))
        url = html.escape(m.group(2), quote=True)
        parts.append(f'<a href="{url}" target="_blank" rel="noopener">{html.escape(m.group(1))}</a>')
        pos = m.end()
    parts.append(html.escape(text[pos:]))
    return ''.join(parts)


def blocks(lines):
    """Group lines into blocks: ('list', items) | ('links', text) | ('p', text)."""
    out, para = [], []

    def flush():
        if para:
            out.append(('p', ' '.join(para)))
            para.clear()

    for line in lines:
        stripped = line.strip()
        if not stripped:
            flush()
        elif stripped.startswith('- '):
            flush()
            if out and out[-1][0] == 'list':
                out[-1][1].append(stripped[2:].strip())
            else:
                out.append(('list', [stripped[2:].strip()]))
        elif stripped.lower().startswith('links:'):
            flush()
            out.append(('links', stripped[6:].strip()))
        else:
            para.append(stripped)
    flush()
    return out


def render_paragraph(text):
    if EMAIL_RE.match(text):
        return (f'                <p><a class="contact-link" '
                f'href="mailto:{text}">{text}</a></p>')
    return f'                <p>{inline(text)}</p>'


def render_team_item(item):
    for sep in (' — ', ' - '):
        if sep in item:
            name, role = item.split(sep, 1)
            return (f'                    <li>{html.escape(name)} '
                    f'<span class="role">{html.escape(role)}</span></li>')
    return f'                    <li>{html.escape(item)}</li>'


def render_links_row(text):
    anchors = ''.join(
        f'\n                        <a href="{html.escape(url, quote=True)}" '
        f'target="_blank" rel="noopener">{html.escape(label)}</a>'
        for label, url in LINK_RE.findall(text)
    )
    return ('                    <div class="project-links">\n'
            '                        <span class="links-label">links:</span>'
            f'{anchors}\n                    </div>')


def render_project(title, tag, body_lines):
    out = ['                <article class="project">',
           '                    <div class="project-head">']
    if tag:
        out.append(f'                        <span class="project-tag">{html.escape(tag)}</span>')
    out.append(f'                        <h3 class="project-title">{inline(title)}</h3>')
    out.append('                    </div>')
    for kind, data in blocks(body_lines):
        if kind == 'p':
            out.append(f'                    <p class="project-description">{inline(data)}</p>')
        elif kind == 'list':
            items = ''.join(f'\n                        <li>{inline(i)}</li>' for i in data)
            out.append(f'                    <ul class="project-sublist">{items}\n                    </ul>')
        elif kind == 'links':
            out.append(render_links_row(data))
    out.append('                </article>')
    return '\n'.join(out)


def render_section(title, body_lines):
    out = ['            <section class="section">',
           f'                <h2>{inline(title)}</h2>']

    # Split body into intro lines and ### project chunks.
    intro, projects, current = [], [], None
    for line in body_lines:
        m = PROJECT_TITLE_RE.match(line)
        if m:
            current = (m.group(1), m.group(2), [])
            projects.append(current)
        elif current is not None:
            current[2].append(line)
        else:
            intro.append(line)

    for kind, data in blocks(intro):
        if kind == 'p':
            out.append(render_paragraph(data))
        elif kind == 'list':
            items = '\n'.join(render_team_item(i) for i in data)
            out.append(f'                <ul class="team-list">\n{items}\n                </ul>')
        elif kind == 'links':
            out.append(render_links_row(data))

    out.extend(render_project(t, tag, body) for t, tag, body in projects)
    out.append('            </section>')
    return '\n'.join(out)


def main():
    md = (ROOT / 'content.md').read_text(encoding='utf-8')
    template = (ROOT / 'template.html').read_text(encoding='utf-8')
    site = json.loads((ROOT / 'site.json').read_text(encoding='utf-8'))

    md = re.sub(r'<!--.*?-->', '', md, flags=re.S)  # strip md comments

    sections, current = [], None
    for line in md.splitlines():
        if line.startswith('## ') and not line.startswith('###'):
            current = (line[3:].strip(), [])
            sections.append(current)
        elif current is not None:
            current[1].append(line)

    if not sections:
        sys.exit('content.md: no "## section" headings found')

    page = template
    fills = {
        'TAB_TITLE': html.escape(site['tab_title']),
        'TAB_TITLE_JSON': json.dumps(site['tab_title']),
        'NAME': html.escape(site['name'], quote=True),
        'URL': html.escape(site['url'], quote=True),
        'TAGLINE': html.escape(site['tagline']),
        'DESCRIPTION': html.escape(site['description'], quote=True),
        'KEYWORDS': html.escape(site['keywords'], quote=True),
        'OG_TITLE': html.escape(site['og_title'], quote=True),
        'OG_DESCRIPTION': html.escape(site['og_description'], quote=True),
        'TWITTER_HANDLE': html.escape(site['twitter_handle'], quote=True),
        'TWITTER_URL': html.escape(site['twitter_url'], quote=True),
        'GITHUB_URL': html.escape(site['github_url'], quote=True),
        'THEME_COLOR': html.escape(site['theme_color'], quote=True),
        'COPYRIGHT': html.escape(site['copyright']),
    }
    for key, value in fills.items():
        page = page.replace('{{' + key + '}}', value)

    content = '\n\n'.join(render_section(t, body) for t, body in sections)
    page = page.replace('{{CONTENT}}', content)

    leftover = re.findall(r'\{\{[A-Z_]+\}\}', page)
    if leftover:
        sys.exit(f'unfilled placeholders: {sorted(set(leftover))}')

    (ROOT / 'index.html').write_text(page, encoding='utf-8')
    print(f'index.html generated ({len(sections)} sections)')


if __name__ == '__main__':
    main()
