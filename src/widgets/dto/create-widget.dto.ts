import { IsString, IsNotEmpty, IsOptional, IsJSON } from 'class-validator';

export class CreateWidgetDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  configuration?: any;

  @IsOptional()
  layouts?: any;

  @IsOptional()
  widgetsData?: any;

  @IsString()
  @IsNotEmpty()
  pageId: string;

}