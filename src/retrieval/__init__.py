"""Track D - Retrieval v1 (vector-only baseline).

The path below is the one-line swap when the full embed (Step 4a) completes:
flip ``VECTOR_DB_PATH`` from the pilot to the full store and re-run.
"""
from __future__ import annotations

from typing import TYPE_CHECKING, Any

from src.models import AnswerResult, RetrievalPath


VECTOR_DB_PATH = "output/lancedb"
GRAPH_DB_PATH = "output/graph.db"


__all__ = [
    "AnswerResult",
    "RetrievalPath",
    "Pipeline",
    "answer",
    "get_pipeline",
    "VECTOR_DB_PATH",
    "GRAPH_DB_PATH",
]


if TYPE_CHECKING:
    from src.retrieval.pipeline import Pipeline, answer, get_pipeline  # noqa: F401


def __getattr__(name: str) -> Any:
    # Lazy-load the real Pipeline so that light consumers (Streamlit demo,
    # tests, MockPipeline) can import this package without dragging in
    # voyageai / lancedb / sentence-transformers and the API keys they need.
    if name in {"Pipeline", "answer", "get_pipeline"}:
        from src.retrieval import pipeline as _pipeline_mod

        return getattr(_pipeline_mod, name)
    raise AttributeError(f"module 'src.retrieval' has no attribute {name!r}")
