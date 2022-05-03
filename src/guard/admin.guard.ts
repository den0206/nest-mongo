import { AuthoraizationGuard } from './authorization.guard';

export class AdminGuard extends AuthoraizationGuard {
  constructor() {
    super(['ADMIN']);
  }
}
