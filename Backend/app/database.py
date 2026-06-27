from langchain_ollama import OllamaEmbeddings


from langchain_qdrant import QdrantVectorStore

from app.config import *

embedding_model = OllamaEmbeddings(
    model="nomic-embed-text"
)

vector_db = QdrantVectorStore.from_existing_collection(
    url=QDRANT_URL,
    collection_name=COLLECTION_NAME,
    embedding=embedding_model,
)