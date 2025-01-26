import { Injectable } from '@nestjs/common';

import * as moment from 'moment';
import * as _ from 'lodash';
import * as PDF from 'pdfkit';

import { Readable } from 'stream';

import { Day, User } from '@prisma/client';

type PdfScheduleItem = {
    teacher: string;
    subject: string;
    startTime: Date;
    endTime: Date;
    day: Day
    classroom: string;
}

@Injectable()
export class PdfHelper {
    public generatePdf(user: User, schedule: PdfScheduleItem[]) {
        const days = Object.values(Day);

        const groupped = _.groupBy(schedule, 'day');

        const pdf = new PDF()

        const rd = new Readable().wrap(pdf);

        pdf
            .fontSize(20)
            .text(`Schedule for Student ${user.email}`, { align: 'center' })
            .moveDown(0.5);
        pdf
            .fontSize(12)
            .text(`Generated: ${moment().format('YYYY-MM-DD')}`, { align: 'center' })
            .moveDown(1);


        for (let i = 0; i < days.length; i++) {
            const day = days[i];

           pdf
                .font('Helvetica-Bold')
                .fontSize(18)
                .text(_.capitalize(day), 50, pdf.y)
                .moveDown(0.5)
                .strokeColor('#000000')
                .lineWidth(1)
                .stroke();;


            const schedule = groupped[day] || [];
            const lessons = schedule.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

            const tableTop = pdf.y;
            const itemX = 50;
            const subjectX = 150;
            const classroomX = 300;
            const teacherX = 400;

            pdf
                .font('Helvetica')
                .fontSize(12)
                .text('Time', itemX, tableTop)
                .text('Subject', subjectX, tableTop)
                .text('Classroom', classroomX, tableTop)
                .text('Teacher', teacherX, tableTop);

            pdf.moveTo(50, tableTop + 15)
                .lineTo(550, tableTop + 15)
                .stroke();

            let rowY = tableTop + 20;

            for (let j = 0; j < lessons.length; j++) {
                const lesson = lessons[j];

                pdf
                    .fontSize(12)
                    .text(`${moment(lesson.startTime).format('HH:mm')}-${moment(lesson.endTime).format('HH:mm')}`, itemX, rowY)
                    .text(lesson.subject, subjectX, rowY)
                    .text(lesson.classroom, classroomX, rowY)
                    .text(lesson.teacher, teacherX, rowY);

                rowY += 20;
            }

            pdf.moveDown(1)
        }

        pdf.end();

        return rd;
    }
}
