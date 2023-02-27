<script lang="ts">
import {computed, defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  name: 'BaseMixins',

  setup(){
    const showAlert = ()=>{
      alert(0);
    }

    return {showAlert}
  }
});
</script>
