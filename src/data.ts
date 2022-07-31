interface Data {
    report: {
        id:string;
        source:string;
        amount:number;
        created_at:Date;
        updated_at:Date;
        type:ReportType;
    }[]
}

export enum ReportType {
    INCOME = "income",
    EXPENSE = "expense",
}

export const data :Data = {
    report:[{
        id: "1",
        source: "Income",  
        amount: 1,
        created_at: new Date(),
        updated_at: new Date(),
        type: ReportType.INCOME,
    },
    {
        id: "2",
        source  : "Expense", 
        amount: 2, 
        created_at: new Date(),
        updated_at: new Date(),
        type: ReportType.EXPENSE,
    }]
}