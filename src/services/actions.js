class Actions {
    constructor(){
        this.namespace = null;
        this.action = null;
    }
    namespace(ns){
        this.namespace = ns;
        return this;
    }
    action(type, payload){
        const typeLabel = this.namespace ? `${this.namespace}/${type}` : type;
        return {
            type : typeLabel,
            payload
        }
    }
}

const instance = new Actions();

export default instance;
