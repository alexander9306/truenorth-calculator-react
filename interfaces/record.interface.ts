export interface Record {
  id: number;
  amount: number;
  user_balance: number;
  operation_response: string;
  date: string;
  status: string;
  user: { id: number; username: string; status: string };
}
