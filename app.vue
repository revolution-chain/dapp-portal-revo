<template>
  <NuxtLayout>
    <slot />
  </NuxtLayout>
</template>
<script src="/set-custom-hyperchains-config.js"></script>
<script lang="ts" setup>
useZkSyncWithdrawalsStore().updateWithdrawalsIfPossible(); // init store to update withdrawals

const route = useRoute();
watch(
  () => route.path,
  () => {
    trackPage();
  },
  { immediate: true }
);

const portalRuntimeConfig = usePortalRuntimeConfig();
if (portalRuntimeConfig.gitRepoUrl && portalRuntimeConfig.gitCommitHash) {
  logger.log(`=== App source: ${portalRuntimeConfig.gitRepoUrl}/commit/${portalRuntimeConfig.gitCommitHash} ===`);
}
</script>
