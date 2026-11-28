// Datos que va a utilizar de cada empleado
export interface Empleado {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  age: number;
  phone: string;

  company: {
    department: string;
    title: string;
    name: string;
  };
}

// Respuesta que devuelve DummyJSON
export interface RespuestaEmpleados {
  users: Empleado[];
  total: number;
  skip: number;
  limit: number;
}
