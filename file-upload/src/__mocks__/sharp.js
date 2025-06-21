// Mock pour Sharp - contourne les problèmes de compilation avec Node.js 22
class SharpMock {
  constructor(input) {
    this.input = input;
    return this;
  }
  
  resize(width, height) {
    console.log(`[MOCK] Sharp resize: ${width}x${height}`);
    return this;
  }
  
  jpeg(options) {
    console.log(`[MOCK] Sharp jpeg: quality ${options?.quality || 80}`);
    return this;
  }
  
  png(options) {
    console.log(`[MOCK] Sharp png:`, options);
    return this;
  }
  
  webp(options) {
    console.log(`[MOCK] Sharp webp:`, options);
    return this;
  }
  
  toBuffer() {
    console.log(`[MOCK] Sharp toBuffer`);
    return Promise.resolve(Buffer.from('mock-image-data'));
  }
  
  toFile(filepath) {
    console.log(`[MOCK] Sharp toFile: ${filepath}`);
    return Promise.resolve({ format: 'jpeg', width: 100, height: 100, channels: 3, premultiplied: false, size: 1000 });
  }
}

const sharp = (input) => new SharpMock(input);

// Ajout des propriétés statiques si nécessaire
sharp.cache = () => sharp;
sharp.concurrency = () => sharp;
sharp.counters = () => ({ queue: 0, process: 0 });
sharp.simd = () => sharp;

module.exports = sharp; 