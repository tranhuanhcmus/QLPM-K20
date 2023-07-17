
/**
 * Service class for managing broadcast channel.
 * This service follows the Singleton design pattern to provide a single instance across the application.
 */
class BroadcastService {
    static instance = null;
    channel = null;
    constructor() {
        // Tạo một kênh mới
        this.channel = new BroadcastChannel('channel');
    }

    getChannel() { 
        if(!this.channel) {
            // Tạo một kênh mới
            this.channel = new BroadcastChannel('channel');
        }
        return this.channel;
    }
    // Phương thức để gửi thông điệp
    postMessage(message) {
        this.channel.postMessage(message);
    }

    /**
     * Get the singleton instance of BroadcastService.
     * @returns {BroadcastService} The instance of UserService.
     */
    static getInstance() {
        if (!BroadcastService.instance) {
            BroadcastService.instance = new BroadcastService();
        }
        return BroadcastService.instance;
    }
}

export default BroadcastService.getInstance();
