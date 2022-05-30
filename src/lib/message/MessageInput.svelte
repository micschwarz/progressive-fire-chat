<script lang="ts">
    import { add } from '$lib/firebase/firestore/collections/messages';
    import { currentUser } from '$lib/user/userStore';

    $: user = $currentUser;

    let message = '';
    $: messageSendable = message.length > 0;

    let sendRequest = Promise.resolve();

    const send = () => {
        if (!messageSendable) {
            return;
        }

        sendRequest = add({
            user: {
                id: user!.id,
                name: user!.name,
            },
            content: message,
            createdAt: new Date(),
        });

        message = '';
    };
</script>

<form on:submit|preventDefault={send} class="flex gap-1 w-full max-w-md">
    <div class="grow">
        <input placeholder="Nachricht" class="input input-bordered w-full" type="text" bind:value={message} />
    </div>
    <div class="w-32">
        {#await sendRequest}
            <button class="btn btn-primary w-full loading" type="button" disabled>Sende</button>
        {:then _}
            <button class="btn btn-primary w-full" type="submit" disabled={!messageSendable}>Senden</button>
        {/await}
    </div>
</form>
