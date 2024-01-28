import os, json

cdo_path = '../griffon-dore/tsconfig.json'
ws_path = '../../warskald_official/tsconfig.json'

cdo = {}
ws = {}

with open(cdo_path, 'r') as data:
    cdo = json.load(data)
    
with open(ws_path, 'r') as data:
    ws = json.load(data)
    
cdo_keys = list(cdo.get('compilerOptions').keys())
ws_keys = list(ws.get('compilerOptions').keys())
diff = []
for key in ws_keys:
    if key not in cdo_keys:
        diff.append(key)
        
print(diff)