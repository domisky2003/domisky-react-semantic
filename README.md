# React Semantics
Explorations into the wild and wonderful world of React semantics.

## Why is this code hard to reason about?
- Global mutable state mixed with React's functional view of the world
- Setters and getters galore; in some cases, the order you call `setLoading` and `setTodo` might matter
- Network and API unreliability
