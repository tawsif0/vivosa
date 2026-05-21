import fitz, json, os
pdf_path = r"e:/vivosa/Pant's-w-m.pdf"
doc = fitz.open(pdf_path)
pages = []
for i in range(len(doc)):
    page = doc[i]
    text = page.get_text().strip()
    pages.append({"page": i+1, "text": text})
out_path = r"e:/vivosa/pants_pdf_output.json"
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(pages, f, ensure_ascii=False, indent=2)
print('Done')
