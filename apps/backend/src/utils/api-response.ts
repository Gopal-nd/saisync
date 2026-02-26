export class ApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;

  constructor({ statusCode, data, message = "Success" }: { statusCode: number; data: any; message?: string }) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
