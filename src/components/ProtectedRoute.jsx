export default function ProtectedRoute({ allowed, fallback, children }) {
  return allowed ? children : fallback;
}
