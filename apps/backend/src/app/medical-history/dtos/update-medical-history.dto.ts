import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMedicalHistoryDto {
  @ApiProperty({
    type: 'string',
    description: 'Complaint of Patient',
    example:
      'Жалобы на боли в области тазобедренного сустава. Со слов пациента болит место входа.',
  })
  @IsNotEmpty()
  @IsString()
  patient_complaint: string;

  @ApiProperty({
    type: 'string',
    description: 'Plan of Treatment',
    example:
      'Перестать называть тазобедренный сустав местом входа, изменив отношение. Записан на повторный приём для проверки результата.',
  })
  @IsNotEmpty()
  @IsString()
  treatment_plan: string;

  @ApiProperty({
    type: 'string',
    description: 'Disease Conclusion',
    example:
      'Неверное отношение пациента к заболевшей части тела. Лечение назначено.',
  })
  @IsNotEmpty()
  @IsString()
  disease_conclusion: string;
}
