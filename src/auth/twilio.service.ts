import { Injectable, Logger } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
    private client: Twilio;
    private serviceSid: string;
    private readonly logger = new Logger(TwilioService.name);

    constructor() {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        this.serviceSid = process.env.TWILIO_SERVICE_SID || '';

        if (!accountSid || !authToken || !this.serviceSid) {
            this.logger.warn('Twilio credentials not found in environment variables');
        }

        this.client = new Twilio(accountSid, authToken);
    }

    async sendOtp(phoneNumber: string): Promise<void> {
        try {
            await this.client.verify.v2.services(this.serviceSid)
                .verifications
                .create({ to: phoneNumber, channel: 'sms' });
            this.logger.log(`OTP sent to ${phoneNumber}`);
        } catch (error) {
            this.logger.error(`Failed to send OTP to ${phoneNumber}: ${error.message}`);
            throw error;
        }
    }

    async verifyOtp(phoneNumber: string, code: string): Promise<boolean> {
        try {
            const verificationCheck = await this.client.verify.v2.services(this.serviceSid)
                .verificationChecks
                .create({ to: phoneNumber, code });

            if (verificationCheck.status === 'approved') {
                this.logger.log(`OTP verified for ${phoneNumber}`);
                return true;
            }
            this.logger.warn(`OTP verification failed for ${phoneNumber}: ${verificationCheck.status}`);
            return false;
        } catch (error) {
            this.logger.error(`Failed to verify OTP for ${phoneNumber}: ${error.message}`);
            throw error;
        }
    }
}
