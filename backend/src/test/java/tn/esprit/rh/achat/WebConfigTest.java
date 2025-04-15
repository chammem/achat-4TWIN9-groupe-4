package tn.esprit.rh.achat;

import io.micrometer.core.instrument.MeterRegistry;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;

@Disabled
class WebConfigTest {

    MeterRegistry meterRegistry;

    @Test
    void shouldHaveCommonTags() {
        assertThat(meterRegistry.get("jvm.memory.used").tags("application", "SpringMVC")).isNotNull();
    }
}