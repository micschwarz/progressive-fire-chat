import type { Message } from '$lib/message/message';
import {
    addDoc,
    collection,
    CollectionReference,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    query,
    QueryDocumentSnapshot,
    QuerySnapshot,
    Timestamp,
    type DocumentData,
    type FirestoreDataConverter,
    type SnapshotOptions,
} from 'firebase/firestore';
import { writable, type Readable, type Subscriber, type Unsubscriber } from 'svelte/store';

interface MessageDoc {
    userId: string;
    userName: string;
    content: string;
    createdAt: Timestamp;
}

const messageConverter: FirestoreDataConverter<Message> = {
    toFirestore(message: Message): DocumentData {
        return {
            userId: message.user.id,
            userName: message.user.name,
            content: message.content,
            createdAt: Timestamp.fromDate(message.createdAt),
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<MessageDoc>, options: SnapshotOptions): Message {
        const data = snapshot.data(options);

        return {
            user: {
                id: data.userId,
                name: data.userName,
            },
            content: data.content,
            createdAt: data.createdAt.toDate(),
        };
    },
};

const getCollection = (): CollectionReference<Message> => {
    const db = getFirestore();
    return collection(db, 'messages').withConverter(messageConverter);
};

export const add = async (message: Message): Promise<void> => {
    const col = getCollection();
    await addDoc(col, message);
};

export const getStore = (): Readable<Message[] | undefined> => {
    const messageCollection = getCollection();
    const messageQuery = query(messageCollection, orderBy('createdAt'), limit(50));

    const messageStore = writable<Message[] | undefined>(undefined);

    const unsubFirestore = onSnapshot(messageQuery, (snapshot: QuerySnapshot<Message>) => {
        const newMessages = snapshot
            .docChanges()
            .filter((change) => change.type === 'added')
            .map((change) => change.doc.data());

        messageStore.update((messages: Message[] | undefined) => {
            const oldMessages = messages ?? [];
            return [...oldMessages, ...newMessages].sort((a, b) => +a.createdAt - +b.createdAt);
        });
    });

    return {
        subscribe: (run: Subscriber<Message[] | undefined>): Unsubscriber => {
            const unsubStore = messageStore.subscribe(run);
            return () => {
                unsubFirestore();
                unsubStore();
            };
        },
    };
};
