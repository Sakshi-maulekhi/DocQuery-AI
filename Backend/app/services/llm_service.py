from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="gemma3:4b",
    temperature=0
)

def ask_llm(context: str, question: str):

    system_prompt = f"""
You are a helpful AI assistant.

Answer ONLY from the provided context.

If the answer is unavailable, say:
"I couldn't find this information in the uploaded PDF."

Context:

{context}
"""

    response = llm.invoke(
        [
            ("system", system_prompt),
            ("human", question),
        ]
    )

    return response.content