from unittest                                                             import TestCase
from osbot_fast_api.utils.Fast_API__Server_Info                           import Fast_API__Server_Info
from osbot_utils.utils.Misc                                               import list_set
from presentation_blackhat_eu_dec_2025.service.info.Service_Info                     import Service_Info
from presentation_blackhat_eu_dec_2025.service.info.schemas.Enum__Service_Status     import Enum__Service_Status
from presentation_blackhat_eu_dec_2025.service.info.schemas.Schema__Service__Status  import Schema__Service__Status
from presentation_blackhat_eu_dec_2025.utils.Version                                 import version__presentation_blackhat_eu_dec_2025


class test_Server_Info(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server_info = Service_Info()

    def test___init__(self):
        with self.server_info as _:
            assert type(_) == Service_Info

    def test_status(self):
        with self.server_info.service_info() as _:
            assert type(_)       == Schema__Service__Status
            assert _.name        == 'presentation_blackhat_eu_dec_2025'
            assert _.status      == Enum__Service_Status.operational
            assert _.version     == version__presentation_blackhat_eu_dec_2025
            assert _.environment == self.server_info.environment()

    def test_versions(self):
        with self.server_info.versions() as _:
            assert list_set(_.json()) == ['osbot_fast_api',
                                          'osbot_fast_api_serverless',
                                          'osbot_utils']

    def test_server_info(self):
        with self.server_info.server_info() as _:
            assert type(_) is Fast_API__Server_Info