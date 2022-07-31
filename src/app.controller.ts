import { Controller, Delete, Get, Post, Put,Param ,Body,HttpCode} from '@nestjs/common';

import {data, ReportType} from './data'

import {v4 as uuid} from 'uuid'

@Controller('/reports/:type')
export class AppController {
  @Get()
  getAllIncomeReports(@Param('type') type: string) {

    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return data.report.filter((report) => report.type === reportType)
  }

  @Get(":id")
  getIncomeReportById(@Param("type") type: string, @Param("id") id: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    const reportId = id;

    return data.report.find((report) => report.id === reportId && report.type === reportType)
  }


  @HttpCode(204)
  @Post()
  createIncomeReport(@Body() {amount,source}:{
    amount: number,
    source: string,
  }, @Param('type') type: string
  ) { 

    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    const newReport = {
      id:uuid(),
      source,
      amount,
      created_at : new Date(),
      updated_at : new Date(),
      type: reportType
    }
    data.report.push(newReport)

    return newReport
  }

  @Put(":id")
  updateIncomeReportById(
    @Body() body : {
      amount: number,
      source: string,
    }, 
    @Param('type') type: string,
    @Param('id') id: string,
  ){
    const reportType = type === 'income'? ReportType.INCOME : ReportType.EXPENSE;

    const reportToUpdate = data.report.filter((report) => report.type === reportType).find((report)=> report.id === id)

    if(!reportToUpdate) return;

    const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id)

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body
    }

    return data.report[reportIndex]
  }

  @Delete(":id")
  deleteIncomeReportById(
    @Param('id') id: string,
    @Param('type') type: string,
  ){
    const reportIndex = data.report.findIndex((report)=> report.id === id);

    if(reportIndex === -1) return;

    data.report.splice(reportIndex, 1)
    
    return ;
  }
}
