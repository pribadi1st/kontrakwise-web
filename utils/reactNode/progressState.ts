export function getNodeBorderColor(status: string) {
    switch (status) {
        case 'loading': return 'border-warning';
        case 'failed': return 'border-danger';
        case 'success': return 'border-success';
        default: return 'border-primary-border';
    }
}