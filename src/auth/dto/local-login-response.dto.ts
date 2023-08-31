import { ApiProperty } from '@nestjs/swagger';

export class LocalLoginResponseDTO {
  @ApiProperty({
    description: 'JWT token',
  })
  access_token: string;
}
