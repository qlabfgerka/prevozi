import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {
    this.storage.create();
  }

  public async set(key: string, value: any): Promise<void> {
    await this.storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    return this.storage?.get(key);
  }

  public async remove(key: string): Promise<void> {
    return await this.storage?.remove(key);
  }
}
