

from fastapi.middleware.cors import CORSMiddleware


from fastapi import FastAPI, File, UploadFile, HTTPException
from typing import List
import os
app = FastAPI()

FILE_DIR = 'data/'
DB_DIR = 'chromaDB'
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with the specific origin(s) of your frontend for better security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

@app.post("/uploadpdf/")
async def upload_pdf(file: UploadFile = File(...)):
    # Check if the uploaded file is a PDF
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # Read the file's contents
    contents = await file.read()

    # Optionally save the PDF to disk
    
    save_path = os.path.join(FILE_DIR,file.filename)
    print('filename :',save_path)
    # save_path = f"uploaded_{file.filename}"
    with open(save_path, "wb") as f:
        f.write(contents)

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(contents),
        "message": f"PDF file '{file.filename}' uploaded successfully!",
    }