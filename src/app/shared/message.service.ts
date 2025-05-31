import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Message {
  id?: string;
  sender: 'law' | 'security';
  text: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesCollection: AngularFirestoreCollection<Message>;
  messages$: Observable<Message[]>;

  constructor(private afs: AngularFirestore) {
    this.messagesCollection = afs.collection<Message>('messages', ref => ref.orderBy('timestamp', 'asc'));
    this.messages$ = this.messagesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Message;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getMessages(): Observable<Message[]> {
    return this.messages$;
  }

  sendMessage(sender: 'law' | 'security', text: string) {
    const newMessage: Message = {
      sender,
      text,
      timestamp: Date.now()
    };
    this.messagesCollection.add(newMessage);
  }
}
