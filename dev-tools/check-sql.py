# Checks a migration the way the Cloudflare D1 console runs it: it splits on
# EVERY ";" (even inside -- comments), so the file must be comment-free and
# each piece must run on its own.
# Usage (from the site folder): python3 dev-tools/check-sql.py migrations/0001_init.sql
import sqlite3, sys, re
s = open(sys.argv[1]).read()
if '--' in s: print('FAIL: remove every -- comment (the D1 console splits on ; inside comments)'); sys.exit(1)
left = re.findall(r'__[A-Z0-9_]+__', s)
if left: print('FAIL: unfilled placeholders:', sorted(set(left))); sys.exit(1)
db = sqlite3.connect(':memory:')
parts = [p for p in s.split(';') if p.strip()]
for p in parts: db.execute(p)
n = db.execute('select count(*) from content_fields').fetchone()[0] if 'content_fields' in s else 0
cols = [r[1] for r in db.execute('pragma table_info(inquiries)')]
print(f'OK: {len(parts)} statements, {n} seed rows, inquiries columns: {cols}')
