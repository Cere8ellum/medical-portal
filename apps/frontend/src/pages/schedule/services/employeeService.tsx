/* eslint-disable @typescript-eslint/no-explicit-any */
const KEYS = {
  employees: 'employees',
  employeeId: 'employeeId',
};

export const getDepartmentCollection = () => [
  { id: '1', title: 'Нет свободной записи' },
  { id: '2', title: 'Выходной' },
  { id: '3', title: 'Отпуск' },
  { id: '4', title: 'Больничный' },
];

export function insertEmployee(data: { [x: string]: number; id: number }) {
  const employees = getAllEmployees();
  data['id'] = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function updateEmployee(data: { id: any }) {
  const employees = getAllEmployees();
  const recordIndex = employees.findIndex((x: { id: any }) => x.id == data.id);
  employees[recordIndex] = { ...data };
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteEmployee(id: any) {
  let employees = getAllEmployees();
  employees = employees.filter((x: { id: any }) => (x.id! = id));
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeId) == null)
    localStorage.setItem(KEYS.employeeId, '0');
  let id = localStorage.getItem(KEYS.employeeId);
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
}

export function getAllEmployees() {
  if (localStorage.getItem(KEYS.employees) == null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  const employees = localStorage.getItem(KEYS.employeeId);
  const departments = getDepartmentCollection();
  return employees.map((x: { departmentI: any }) => ({
    ...x,
    department: departments[x.departmentId - 1].title,
  }));
}
