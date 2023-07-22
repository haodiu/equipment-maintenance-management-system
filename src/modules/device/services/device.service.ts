import type { DeviceRepository } from '../repositories/device.repository';

export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}
}
