import { Injectable, Res } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { Response } from 'express';

import { ImageService } from '../../../shared/services/image.service';
import { ValidatorService } from '../../../shared/services/validator.service';
import { DEVICE_LOGBOOKS_DOWNLOAD_DTO } from '../../device/domains/dtos/device-logbook-dowload-row.dto';
import type { DeviceLogbookDownloadDto } from '../../device/domains/dtos/device-logbook-download.dto';
import type { LiquidationDownloadDto } from '../../liquidation/domains/dtos/liquidation-download.dto';
import { LIQUIDATION_DOWNLOAD_DTO } from '../../liquidation/domains/dtos/liquidation-download-column.dto';

@Injectable()
export class FileService {
  constructor(
    private validatorService: ValidatorService,
    private readonly imageService: ImageService,
  ) {}

  /**
   * Downloads user information as an Excel file.
   *
   * @param {LiquidationDownloadDto} data - The liquidation information data to be downloaded.
   * @param {Response} res - The Express response object.
   * @returns {Promise<void>} - A Promise that resolves once the download is complete.
   */
  async downloadLiquidationInfoExcel(
    data: LiquidationDownloadDto[],
    @Res() res: Response,
  ) {
    const book = new Workbook();

    const sheet = book.addWorksheet('sheet1');
    const liquidationColumnInfo = Object.values(LIQUIDATION_DOWNLOAD_DTO);

    // Writing headers from liquidationColumnInfo
    for (const [i, element] of liquidationColumnInfo.entries()) {
      sheet.getCell(1, i + 1).value = element;
    }

    // Writing data from the array of LiquidationDownloadDto
    for (const [rowIndex, datum] of data.entries()) {
      const rowData = Object.values(datum);

      for (const [i, element] of rowData.entries()) {
        sheet.getCell(rowIndex + 2, i + 1).value = element;
      }
    }

    // Generate the filename
    const filename = 'LiquidationInfo.xlsx';

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Transfer-Encoding', 'binary');

    res.status(200);
    await book.xlsx.write(res);
    res.end();
  }

  async downloadDeviceLogbooksExcel(
    data: DeviceLogbookDownloadDto[],
    @Res() res: Response,
  ) {
    const book = new Workbook();

    const sheet = book.addWorksheet('sheet1');
    const logbookColumnInfo = Object.values(DEVICE_LOGBOOKS_DOWNLOAD_DTO);

    // Writing headers from logbookColumnInfo
    for (const [i, element] of logbookColumnInfo.entries()) {
      sheet.getCell(1, i + 1).value = element;
    }

    // Writing data from the array of DeviceLogbookDownloadDto
    for (const [rowIndex, datum] of data.entries()) {
      const rowData = Object.values(datum);

      for (const [i, element] of rowData.entries()) {
        sheet.getCell(rowIndex + 2, i + 1).value = element;
      }
    }

    // Generate the filename based on deviceId and deviceName
    const firstData = data[0];
    let filename = `${firstData.deviceId}`;

    if (firstData.deviceName) {
      const formattedDeviceName = firstData.deviceName.replace(/ /g, '-');
      filename += `_${formattedDeviceName}`;
    }

    filename += `_LogbooksInfo.xlsx`;
    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Transfer-Encoding', 'binary');

    res.status(200);
    await book.xlsx.write(res);
    res.end();
  }
}
