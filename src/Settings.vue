<template>
  <div class="view-integration-modal__activation">
    <div class="activation-main-wrapper">
      <div class="dtc-activation-page">
        <div class="dtc-send-phone-block">
          <div>
            <SettingsPhone :isMain="false" />
          </div>
          <div>
            <Support :isMain="false">
              <template v-slot:text>
                <div class="dtc-feedback__text">
                  <strong class="text-[15px] text-[#343434]"
                    >Техническая поддержка</strong
                  ><br />
                  <p class="text-[15px] text-black">
                    Мы всегда готовы помочь удобном для вас способом
                  </p>
                </div>
              </template>
            </Support>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 10px" class="float-right"></div>
  </div>
  <notifications position="top right" width="400px" :duration="5000" />
</template>

<script setup>
import { onMounted } from "vue";
import SettingsPhone from "./components/SettingsPhone.vue";
import Support from "./components/Support.vue";
import { useSubdomain } from "./compostions/useSubdomain";

const { asyncSubdomain, subdomain, checkIsSaved, isSaved, save } =
  useSubdomain();

const goToAdvancedSettings = async () => {
  if (!isSaved.value) {
    // Get the original button element by its id
    let button = $("#save_dct_google_calendar");
    button.click();
    await save();
    window.location.href = `https://${subdomain.value.domain}/settings/widgets/tech8_waweb`;
  }
};

onMounted(async () => {
  await checkIsSaved();
  await asyncSubdomain();
});
</script>
