import { countryRegistry } from './registry.js';

export class NumberEngine {
    constructor() {
        this.storageKey = 'generated_numbers_vault';
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
            this.saveNumber(fullNumber);
            return fullNumber;
        } else {
            return this.generate(countryName); // Recursion if collision occurs
        }
    }

    isUnique(number) {
        const vault = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        return !vault[number];
    }

    saveNumber(number) {
        const vault = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        vault[number] = {
            expiry: Date.now() + (24 * 60 * 60 * 1000) // 24hr TTL
        };
        localStorage.setItem(this.storageKey, JSON.stringify(vault));
    }
}