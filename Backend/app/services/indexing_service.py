from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings

from langchain_qdrant import QdrantVectorStore

from app.config import *


def index_pdf(file_path: str):

    loader = PyPDFLoader(file_path=file_path)

    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=400
    )

    chunks = splitter.split_documents(docs)

    embedding_model = OllamaEmbeddings(
    model="nomic-embed-text"
)

    QdrantVectorStore.from_documents(
        documents=chunks,
        embedding=embedding_model,
        url=QDRANT_URL,
        collection_name=COLLECTION_NAME,
    )