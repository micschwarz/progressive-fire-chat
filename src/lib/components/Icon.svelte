<script lang="ts">
    import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
    import type { IconDefinition as IconDefinitionSolid } from '@fortawesome/free-solid-svg-icons';
    import type { IconDefinition as IconDefinitionRegular } from '@fortawesome/free-regular-svg-icons';
    import { icon as getIcon } from '@fortawesome/fontawesome-svg-core';

    export let icon: IconDefinition | IconDefinitionSolid | IconDefinitionRegular;

    $: html = getIcon(icon).html;
</script>

{@html html}
