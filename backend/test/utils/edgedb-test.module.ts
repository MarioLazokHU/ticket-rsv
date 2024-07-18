import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createClient } from 'edgedb';
import * as fs from 'fs';
import * as path from 'path';

const client = createClient({
  tlsSecurity: 'insecure',
  instanceName: 'test_instance'
});

async function loadDump() {
  const filePath = path.join(__dirname, 'test/test_data', 'main.dump');
  const dumpContent = fs.readFileSync(filePath, 'utf8');
  const commands = dumpContent.split(';').filter(cmd => cmd.trim() !== '');

  for (const command of commands) {
    try {
      await client.execute(command);
    } catch (error) {
      console.error('Error executing command:', command, error);
    }
  }
}

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'EDGE_DB_CLIENT',
      useValue: client,
    },
  ],
  exports: ['EDGE_DB_CLIENT'],
})
export class EdgeDBTestModule implements OnModuleInit {
  async onModuleInit() {
    await loadDump();
  }
}
