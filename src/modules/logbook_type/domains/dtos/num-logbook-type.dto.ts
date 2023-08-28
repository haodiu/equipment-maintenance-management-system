import { ApiProperty } from '@nestjs/swagger';

interface ILogbookTypeCount {
  typeName: string;
  count: number;
}

export class NumLogbookByTypeDto {
  @ApiProperty()
  typeName: string;

  @ApiProperty()
  amount: number;

  constructor(logbookTypeCount: ILogbookTypeCount) {
    this.typeName = logbookTypeCount.typeName;
    this.amount = logbookTypeCount.count;
  }
}
