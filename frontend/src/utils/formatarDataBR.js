export function formatarDataBR(dataISO) {
  if (!dataISO) return '';
  // Aceita tanto 'YYYY-MM-DD' quanto 'YYYY-MM-DDTHH:mm:ss.sssZ'
  const [datePart] = dataISO.split('T');
  const [ano, mes, dia] = datePart.split('-');
  if (!ano || !mes || !dia) return `${dia || 'undefined'}/${mes || 'undefined'}/${ano || ''}`;
  return `${dia}/${mes}/${ano}`;
}