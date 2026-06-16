export interface ResetEmailRequest {
    oldEmail: string;
    newEmail: string;
    code: string;
}