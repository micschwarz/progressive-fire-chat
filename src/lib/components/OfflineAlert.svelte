<script lang="ts">
    import { networkStatus } from '$lib/network/network';

    import { faCheck, faWarning } from '@fortawesome/free-solid-svg-icons';
    import { derived, get, type Readable } from 'svelte/store';
    import { fly } from 'svelte/transition';
    import Icon from './Icon.svelte';

    enum Status {
        online,
        offline,
        noShow,
        initial,
    }

    const statusChange = derived<Readable<boolean>, Status>(
        networkStatus,
        (status, set) => {
            const previous = get(statusChange);
            let next = status ? Status.online : Status.offline;
            if (previous === Status.initial && next === Status.online) {
                next = Status.noShow;
            }
            set(next);
            const timeout = setTimeout(() => set(Status.noShow), 4000);
            return () => clearTimeout(timeout);
        },
        Status.initial,
    );

    const transition = { duration: 100, x: 100 };
</script>

<div class="fixed bottom-2 right-2 flex flex-col gap-2 z-50 text-base">
    {#if $statusChange === Status.online}
        <div class="alert alert-success" transition:fly={transition}>
            <div>
                <Icon icon={faCheck} />
                <span class="ml-1">Du bist wieder online!</span>
            </div>
        </div>
    {:else if $statusChange === Status.offline}
        <div class="alert alert-warning" transition:fly={transition}>
            <div>
                <Icon icon={faWarning} />
                <span class="ml-1">Du bist offline!</span>
            </div>
        </div>
    {/if}
</div>
