from unittest                          import TestCase
from presentation__blackhat-eu__dec-2025.config      import SERVICE_NAME


class test_config(TestCase):

    def test__config_vars(self):
        assert SERVICE_NAME                   == 'presentation__blackhat-eu__dec-2025'