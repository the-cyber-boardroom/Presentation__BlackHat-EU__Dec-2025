from unittest                          import TestCase
from presentation_blackhat_eu_dec_2025.config      import SERVICE_NAME


class test_config(TestCase):

    def test__config_vars(self):
        assert SERVICE_NAME                   == 'presentation_blackhat_eu_dec_2025'