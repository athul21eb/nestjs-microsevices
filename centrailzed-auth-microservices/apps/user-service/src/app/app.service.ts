import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly sampleDatabase = [
    {
      id: '123456',
      name: 'Athul',
      role: 'user',
    },
    {
      id: '123457',
      name: 'Ronaldo',
      role: 'user',
    },
  ];
  profile(_userId: string) {
    return this.sampleDatabase.find((user) => user.id === _userId) ?? null;
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
