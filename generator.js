import { countryRegistry } from './registry.js';

export class NumberEngine {
    constructor() {
        this.vaultKey = 'uniqueno_vault';
        this.historyKey = 'uniqueno_history';
        this.cleanExpired();
    }

    generate(countryName) {
        const config = countryRegistry.find(c => c.name === countryName);
        if (!config) return null;

        const prefix = config.prefixes[Math.floor(Math.random() * config.prefixes.length)];
        const remainingLength = config.length - prefix.toString().length;
        
        let suffix = '';
        for (let i = 0; i < remainingLength; i++) {
            suffix += Math.floor(Math.random() * 10);
        }

        const fullNumber = `${config.code}${prefix}${suffix}`;
        
        if (this.isUnique(fullNumber)) {
            this.saveNumber(fullNumber, countryName);
            return fullNumber;
        } else {
            return this.generate(countryName); 
        }
    }

    isUnique(number) {
        const vault = JSON.parse(localStorage.getItem(this.vaultKey) || '{}');
        return !vault[number];
    }

    saveNumber(number, country) {
        const vault = JSON.parse(localStorage.getItem(this.vaultKey) || '{}');
        const history = JSON.parse(localStorage.getItem(this.historyKey) || '[]');

        // Save to Vault with 24hr expiry
        vault[number] = { expiry: Date.now() + (24 * 60 * 60 * 1000) };
        localStorage.setItem(this.vaultKey, JSON.stringify(vault));

        // Update History (Keep last 3)
        history.unshift({ number, country, time: new Date().toLocaleTimeString() });
        if (history.length > 3) history.pop();
        localStorage.setItem(this.historyKey, JSON.stringify(history));
    }

    getHistory() {
        return JSON.parse(localStorage.getItem(this.historyKey) || '[]');
    }

    cleanExpired() {
        const vault = JSON.parse(localStorage.getItem(this.vaultKey) || '{}');
        const now = Date.now();
        let changed = false;

        for (const num in vault) {
            if (now > vault[num].expiry) {
                delete vault[num];
                changed = true;
            }
        }
        if (changed) localStorage.setItem(this.vaultKey, JSON.stringify(vault));
    }
}