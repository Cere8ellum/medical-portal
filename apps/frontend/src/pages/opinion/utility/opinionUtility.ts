import api from "apps/frontend/src/infrastructure/api";
import { AppointmentDto } from "../schemas/Appointment.dto";

export const getAppointment = async (appointmentId: string  ): Promise<AppointmentDto | undefined> => {
  try {
    const {data}: {data: AppointmentDto} = await  api({
      method: 'get',
      url: `/appointments/${appointmentId}`,
    });
    return data
  } catch (error) {
    console.log(error);
    return undefined
  }
}
