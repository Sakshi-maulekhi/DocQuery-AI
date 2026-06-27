
import traceback

import traceback

from langchain_qdrant import QdrantVectorStore
from langchain_ollama import OllamaEmbeddings

from app.config import QDRANT_URL, COLLECTION_NAME
from app.services.llm_service import ask_llm

embedding_model = OllamaEmbeddings(
    model="nomic-embed-text"
)


def chat(question: str):
    """
    Retrieves relevant chunks from Qdrant and generates an answer
    using the LLM.
    """

    try:
        vector_db = QdrantVectorStore.from_existing_collection(
            url=QDRANT_URL,
            collection_name=COLLECTION_NAME,
            embedding=embedding_model,
        )

        docs = vector_db.similarity_search(
            query=question,
            k=4
        )

        if not docs:
            return "No relevant information found in the uploaded PDF."

        context = ""

        for doc in docs:
            page = doc.metadata.get("page_label", "Unknown")
            source = doc.metadata.get("source", "Unknown")

            context += f"""
Page Number: {page}

Source: {source}

Content:
{doc.page_content}

"""

        answer = ask_llm(
            context=context,
            question=question
        )

        return answer

    except Exception as e:
        traceback.print_exc()
        return str(e)