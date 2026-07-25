export function getStatusBadge(status) {
  if (status === 'completed') {
    return { label: 'Completado', className: 'bg-emerald-500/20 text-emerald-400' };
  }
  if (status === 'in-progress') {
    return { label: 'En curso', className: 'bg-amber-500/20 text-amber-400' };
  }
  throw new Error(`Unknown achievement status: ${status}`);
}
