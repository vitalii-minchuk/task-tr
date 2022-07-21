export const tableHeader = ["ID", "Status", "Type", "Client name", "Amount", "Actions"]

export const possibleStatus= ["Pending", "Completed", "Cancelled"]

export const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header: string) => header.toLowerCase().replace(/\W/g, '_')
}
